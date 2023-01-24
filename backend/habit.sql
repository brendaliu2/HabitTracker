\echo 'Delete and recreate habittracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE habittracker;
CREATE DATABASE habittracker;
\connect habittracker

\i habits-schema.sql
\i habits-seed.sql

\echo 'Delete and recreate habittracker_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE habittracker;
CREATE DATABASE habittracker;
\connect habittracker

\i habits-schema.sql
