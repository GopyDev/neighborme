package neighborme.db;

import java.util.UUID;
import java.util.concurrent.TimeUnit;
import ox.Log;
import ez.Row;
import ez.Table;

public class SessionDB extends NeighborMeDB {

  private static final long ONE_MONTH = TimeUnit.DAYS.toMillis(30);

  @Override
  protected Table getTable() {
    return new Table("session")
        .primary("token", UUID.class)
        .column("userId", Long.class)
        .column("expiration", Long.class);
  }

  public String newSession(long userId) {
    UUID token = UUID.randomUUID();

    long expiration = System.currentTimeMillis() + ONE_MONTH;

    db.insert("session", new Row()
        .with("token", token)
        .with("userId", userId)
        .with("expiration", expiration));

    return token.toString();
  }

  public Long getUserId(String token) {
    Row row = db.selectSingleRow("SELECT userId, expiration FROM session WHERE token = ?", token);
    if (row == null) {
      return null;
    }
    long millis = row.getLong("expiration");
    if (System.currentTimeMillis() > millis) {
      Log.warn("User tried to use an expired token.");
      return null;
    }
    return row.getLong("userId");
  }

}
