package neighborme;

import java.io.File;
import neighborme.web.Authenticator;
import neighborme.web.NeighborMeAPI;
import neighborme.web.Redirector;
import neighborme.web.browse.BrowsePage;
import neighborme.web.dashboard.DashboardPage;
import neighborme.web.home.HomePage;
import neighborme.web.include.IncludeController;
import neighborme.web.messages.MessagesPage;
import neighborme.web.request.RequestHelpPage;
import ox.Config;
import ox.Log;
import ox.OS;
import bowser.WebServer;

public class NeighbormeServer {

  private final Config config = Config.load("neighborme");

  private void run() {
    boolean devMode = config.getBoolean("dev_mode", false);

    int httpPort = config.getInt("port", devMode ? 8080 : 80);

    WebServer server = new WebServer("NeighborMe", httpPort, devMode)
        .add(new Authenticator())
        .add(new Redirector())
        .controller(new IncludeController())
        .controller(new NeighborMeAPI())
        .controller(new HomePage())
        .controller(new DashboardPage())
        .controller(new RequestHelpPage())
        .controller(new BrowsePage())
        .controller(new MessagesPage());

    server.start();
    Log.info("NeighborMe Web Server started (port " + httpPort + ")");
  }

  public static void main(String[] args) {
    Log.logToFolder(new File(OS.getHomeFolder(), "log"));
    new NeighbormeServer().run();
  }

}
