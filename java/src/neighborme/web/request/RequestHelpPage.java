package neighborme.web.request;

import neighborme.db.RequestDB;
import neighborme.model.User;
import ox.Json;
import bowser.Controller;
import bowser.Handler;

public class RequestHelpPage extends Controller {

  private final RequestDB requestDB = new RequestDB();

  @Override
  public void init() {
    route("GET", "/requestHelp").to("request.html");
    route("POST", "/requestHelp").to(requestHelp);
  }

  private final Handler requestHelp = (request, response) -> {
    User user = request.get("user");

    Json json = new Json(request.getContent());
    Json address = json.getJson("address");

    requestDB.insert(user.id, json.get("title"), json.get("description"), json.getInt("amount"), address.get("street"),
        address.get("apartment"), address.get("zipcode"));
  };

}
