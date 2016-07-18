package neighborme.web.messages;

import static java.lang.Integer.parseInt;
import static ox.util.Functions.filter;
import static ox.util.Utils.first;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import neighborme.db.MessageDB;
import neighborme.db.RequestDB;
import neighborme.db.UserDB;
import neighborme.model.User;
import ox.Json;
import bowser.Controller;
import bowser.Handler;
import bowser.template.Data;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Multimap;
import com.google.common.collect.Multimaps;

public class MessagesPage extends Controller {

  private final UserDB userDB = new UserDB();
  private final MessageDB messageDB = new MessageDB();
  private final RequestDB requestDB = new RequestDB();

  @Override
  public void init() {
    route("GET", "/messages").to("messages.html").data(data);
    route("GET", "/thread").to(getThread);
  }

  private final Handler getThread = (request, response) -> {
    int requestId = parseInt(request.param("requestId"));
    int userId = parseInt(request.param("userId"));

    User user = request.get("user");
    List<Json> messages = filter(messageDB.getMessagesForUser(user.id),
        m -> {
          if (m.getLong("requestId") != requestId) {
            return false;
          }
          if (m.getLong("fromId") != userId && m.getLong("toId") != userId) {
            return false;
          }
          return true;
        });

    Map<Long, User> idUsers = Maps.uniqueIndex(userDB.getAll(), u -> u.id);

    List<Long> read = Lists.newArrayList();

    for (Json message : messages) {
      User from = idUsers.get(message.getLong("fromId"));
      message.with("from", from.getFullName());
      if (!message.getBoolean("read")) {
        read.add(message.getLong("id"));
      }
    }

    messageDB.markAsRead(read);

    response.write(Json.array(messages));
  };

  private final Data data = context -> {
    User caller = context.get("user");
    List<Json> messages = messageDB.getMessagesForUser(caller.id);

    Multimap<String, Json> threadMessages = Multimaps.index(messages, m -> hashMessage(m));
    Map<Long, Json> idRequests = Maps.uniqueIndex(requestDB.getAll(), r -> r.getLong("id"));
    Map<Long, User> idUsers = Maps.uniqueIndex(userDB.getAll(), u -> u.id);

    Json o = Json.array();
    for (String key : threadMessages.keySet()) {
      Collection<Json> m = threadMessages.get(key);

      boolean read = true;
      for (Json msg : m) {
        if (Objects.equals(msg.getLong("fromId"), caller.id)) {
          continue;
        }
        if (!msg.getBoolean("read")) {
          read = false;
          break;
        }
      }

      Json firstMessage = first(m);
      User from = idUsers.get(firstMessage.getLong("fromId"));
      User to = idUsers.get(firstMessage.getLong("toId"));
      User them = Objects.equals(from, caller) ? to : from;

      Json request = idRequests.get(firstMessage.getLong("requestId"));
      o.add(Json.object()
          .with("request", request)
          .with("user", them.toJson())
          .with("messages", m)
          .with("read", read)
          );
    }
    context.put("threads", o);
  };

  private String hashMessage(Json message) {
    long a = message.getLong("fromId");
    long b = message.getLong("toId");
    long r = message.getLong("requestId");
    if (a > b) {
      long temp = a;
      a = b;
      b = temp;
    }
    String ret = a + ":" + b + ":" + r;
    return ret;
  }

}
