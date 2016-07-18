package neighborme.web.dashboard;

import static ox.util.Functions.filter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import neighborme.db.MessageDB;
import neighborme.db.RequestDB;
import neighborme.model.User;
import ox.Json;
import bowser.Controller;
import bowser.template.Data;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Multimap;
import com.google.common.collect.Multimaps;
import com.google.common.collect.Sets;

public class DashboardPage extends Controller {

  private final RequestDB requestDB = new RequestDB();
  private final MessageDB messageDB = new MessageDB();

  @Override
  public void init() {
    route("GET", "/dashboard").to("dashboard.html").data(data);
  }

  private final Data data = context -> {
    User user = context.get("user");
    List<Json> unreadMessages = messageDB.getUnreadMessagesTo(user.id);
    Multimap<Long, Json> requestMessages = Multimaps.index(unreadMessages, m -> m.getLong("requestId"));

    List<Json> requests = requestDB.getRequests(user.id);
    requests.forEach(r -> {
      int numUnread = filter(requestMessages.get(r.getLong("id")), m -> {
        return !m.getBoolean("read") && !Objects.equals(m.getLong("fromId"), user.id);
      }).size();
      if (numUnread == 0) {
        r.with("status", "Awaiting responses...");
      } else {
        r.with("status", "<a href='/messages'>You have " + numUnread + " unread "
            + (numUnread == 1 ? "message" : "messages") + ".</a>");
      }
    });
    context.put("requests", requests);

    Set<Long> requestIds = Sets.newLinkedHashSet();

    for (Json message : messageDB.getMessagesFrom(user.id)) {
      requestIds.add(message.getLong("requestId"));
    }

    Map<Long, Json> idRequests = Maps.uniqueIndex(requestDB.getAll(), r -> r.getLong("id"));

    List<Json> offers = Lists.newArrayList();
    for (Long requestId : requestIds) {
      offers.add(idRequests.get(requestId));
    }
    context.put("offers", offers);
  };

}
