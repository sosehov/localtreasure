// load .env data into process.env
require('dotenv').config();

// other dependencies
const fs = require('fs');
const chalk = require('chalk');
const db = require('../db/connection');

// Run all schema files in db/schema/
const runSchemaFiles = async () => {
  console.log(chalk.cyan('-> Loading Schema Files ...'));
  const schemaFilenames = fs.readdirSync('./db/schema').sort();

  for (const fn of schemaFilenames) {
    const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

// Run all migration files in db/migrations/
const runMigrationFiles = async () => {
  const dir = './db/migrations';
  if (!fs.existsSync(dir)) {
    console.log(chalk.yellow('-> No migrations directory found, skipping...'));
    return;
  }

  console.log(chalk.cyan('-> Running Migration Files ...'));
  const migrationFilenames = fs.readdirSync(dir).sort();

  for (const fn of migrationFilenames) {
    const sql = fs.readFileSync(`${dir}/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.magenta(fn)}`);
    await db.query(sql);
  }
};

// Run all seed files in db/seeds/
const runSeedFiles = async () => {
  console.log(chalk.cyan('-> Loading Seed Files ...'));
  const seedFilenames = fs.readdirSync('./db/seeds').sort();

  for (const fn of seedFilenames) {
    const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
    console.log(`\t-> Running ${chalk.green(fn)}`);
    await db.query(sql);
  }
};

const runResetDB = async () => {
  try {
    process.env.DB_HOST &&
      console.log(`-> Connecting to PG on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

    await runSchemaFiles();
    await runMigrationFiles();
    await runSeedFiles();

    console.log(chalk.green('✅ Database reset complete.'));
    process.exit();
  } catch (err) {
    console.error(chalk.red(`❌ Reset failed due to error: ${err}`));
    process.exit(1);
  }
};

runResetDB();
