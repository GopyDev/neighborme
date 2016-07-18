package neighborme.web.login;

import java.util.List;
import java.util.Map;
import ox.IO;
import ox.Json;
import ox.Log;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

public class FacebookAPI {

  private final String accessToken;

  public FacebookAPI(String accessToken) {
    this.accessToken = accessToken;
  }

  public Json getMe() {
    return get("/me?fields=email,name,first_name,last_name,gender");
  }

  public String getProfilePictureURL() {
    Json json = get("/me/picture", ImmutableMap.of("type", "large", "fields", "url", "redirect", "false"));
    return json.getJson("data").get("url");
  }

  public List<Json> getFriends() {
    List<Json> ret = Lists.newArrayList();
    Json data = get("/me/friends");
    Log.debug(data);
    return ret;
  }

  private Json get(String route) {
    return get(route, ImmutableMap.of());
  }

  private Json get(String route, Map<String, String> params) {
    params = Maps.newHashMap(params);
    params.put("access_token", accessToken);

    StringBuilder sb = new StringBuilder("https://graph.facebook.com/v2.4");
    sb.append(route);
    if (route.contains("?")) {
      sb.append("&");
    } else {
      sb.append("?");
    }
    params.forEach((key, value) -> {
      sb.append(key).append('=').append(value).append("&");
    });
    sb.setLength(sb.length() - 1);

    String url = sb.toString();

    Log.debug(url);

    return IO.fromURL(url).toJson();
  }

}
