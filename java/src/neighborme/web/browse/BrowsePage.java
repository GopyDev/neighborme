package neighborme.web.browse;

import static java.lang.Long.parseLong;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import neighborme.db.MessageDB;
import neighborme.db.RequestDB;
import neighborme.db.UserDB;
import neighborme.model.User;
import ox.Json;
import bowser.Controller;
import bowser.Handler;
import bowser.template.Data;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;

public class BrowsePage extends Controller {

  private final UserDB userDB = new UserDB();
  private final RequestDB requestDB = new RequestDB();
  private final MessageDB messageDB = new MessageDB();

  @Override
  public void init() {
    route("GET", "/browseRequests").to("browse.html").data(data);
    route("POST", "/sendMessage").to(sendMessage);
  };

  private final Data data = context -> {
    User me = context.get("user");
    
    Map<Long, User> idUsers = Maps.uniqueIndex(userDB.getAll(), u -> u.id);

    Set<Long> helpOffered = Sets.newHashSet();
    for (Json message : messageDB.getMessagesFrom(me.id)) {
      helpOffered.add(message.getLong("requestId"));
    }

    Json o = Json.array();
    requestDB.getAll().forEach(r -> {
      User user = idUsers.get(r.getLong("userId"));
      if (helpOffered.contains(r.getLong("id"))) {
        // we've already offered to help this posting.
        return;
      }
      o.add(Json.object()
          .with("id", r.getLong("id"))
          .with("user", user.toJson())
          .with("title", r.get("title"))
          .with("amount", r.getInt("amount"))
          .with("description", r.get("description"))
          .with("mine", Objects.equals(user, me))
          );
    });
    context.put("requests", o);
  };

  private final Handler sendMessage = (request, response) -> {
    User caller = request.get("user");
    long requestId = parseLong(request.param("requestId"));
    String text = request.param("message");
    long toId = parseLong(request.param("toId"));

    messageDB.insert(caller.id, toId, requestId, text);
  };

}
