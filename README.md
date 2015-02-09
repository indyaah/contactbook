Simple demo project for managing contacts based on rails 4.2, Angular, PG.
=====


### Project tested on following env.

* Ubuntu 14.04.2 LTS
* RVM (stable)
* Ruby 2.2.0 (p0).
* PostgreSQL 9.4.1 with passwordless access for postgres user on localhost (trust in pg_hba.conf)

### Steps to run locally (Given above setup is ready)

```sh
bundle install
bundle exec rake db:create db:migrate
bundle exec rail s
```
