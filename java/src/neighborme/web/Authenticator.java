package neighborme.web;

import neighborme.db.MessageDB;
import neighborme.db.SessionDB;
import neighborme.db.UserDB;
import neighborme.model.User;
import bowser.Request;
import bowser.RequestHandler;
import bowser.Response;

public class Authenticator implements RequestHandler {

  private final SessionDB sessionDB = new SessionDB();
  private final UserDB userDB = new UserDB();
  private final MessageDB messageDB = new MessageDB();

  @Override
  public boolean process(Request request, Response response) {
    if (request.isStaticResource()) {
      return false;
    }

    String token = request.cookie("token");

    if (token != null) {
      Long userId = sessionDB.getUserId(token);
      if (userId != null) {
        User user = userDB.get(userId);
        request.put("user", user);

        request.put("newMessages", messageDB.getNumUnreadMessages(user.id));
      }
    }

    return false;
  }

}
