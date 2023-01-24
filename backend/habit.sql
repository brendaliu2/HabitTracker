\echo 'Delete and recreate habittracker db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE habittracker;
CREATE DATABASE habittracker;
\connect habittracker

\i habit-schema.sql
\i habit-seed.sql

-- \echo 'Delete and recreate habittracker_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE habittracker_test;
-- CREATE DATABASE habittracker_test;
-- \connect habittracker_test

-- \i habit-schema.sql
