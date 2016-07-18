package neighborme.web;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;
import neighborme.db.SessionDB;
import neighborme.db.UserDB;
import neighborme.model.User;
import neighborme.web.login.FacebookAPI;
import ox.Json;
import ox.Log;
import bowser.Controller;
import bowser.Handler;

public class NeighborMeAPI extends Controller {

  private final UserDB userDB = new UserDB();
  private final SessionDB sessionDB = new SessionDB();

  @Override
  public void init() {
    route("POST", "/login").to(login);
  }

  private final Handler login = (request, response) -> {
    FacebookAPI api = new FacebookAPI(request.param("accessToken"));

    Json me = api.getMe();
    Log.debug(me);

    long facebookId = me.getLong("id");

    User user = userDB.getByFacebookId(facebookId);

    if (user == null) {
      String picUrl = api.getProfilePictureURL();

      // id, email, gender, first_name, last_name, name, timezone, birthday, verified
      LocalDate birthday = null;
      if (me.get("birthday") != null) {
        birthday = LocalDate.parse(me.get("birthday"), DateTimeFormatter.ofPattern("MM/dd/yyyy"));
      }
      user = new User(null, facebookId, me.get("email"), me.get("first_name"), me.get("last_name"), me.get("gender"),
          birthday, picUrl);
      userDB.insert(user);
    } else if (user.email == null) {
      userDB.updateEmail(user.id, me.get("email"));
    }

    String token = sessionDB.newSession(user.id);

    response.cookie("token", token, 14, TimeUnit.DAYS);
  };

}
