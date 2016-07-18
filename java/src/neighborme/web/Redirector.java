package neighborme.web;

import neighborme.model.User;
import bowser.Request;
import bowser.RequestHandler;
import bowser.Response;

public class Redirector implements RequestHandler {

  @Override
  public boolean process(Request request, Response response) {
    if (request.isStaticResource()) {
      return false;
    }

    User user = request.get("user");

    if (request.path.equals("/") && user != null) {
      request.path = "/dashboard";
    }

    return false;
  }

}
