# SPRING SECURITY







### DATABASE DDL-AUTO

| Value         | What Hibernate does                                                      | Typical use                          |
| ------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| `none`        | Does nothing to the schema                                               | Production when migrations manage DB |
| `validate`    | Checks that DB matches entities; **doesn't modify DB**                   | Production                           |
| `update`      | Updates schema to match entities without normally deleting existing data | Development                          |
| `create`      | Drops/recreates schema at startup                                        | Development/testing                  |
| `create-drop` | Creates schema at startup and drops it when app stops                    | Tests                                |
