# PostgreSQL Database Setup Guide

This guide will help you set up two local PostgreSQL databases for the AdvI application.

## Prerequisites

- PostgreSQL installed on your system
- `psql` command-line tool (comes with PostgreSQL)

## Step 1: Install PostgreSQL

### macOS (using Homebrew)
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows
Download and install from: https://www.postgresql.org/download/windows/

## Step 2: Create Database

Open a terminal and connect to PostgreSQL:

```bash
psql postgres
```

Then run these commands to create the database:

```sql
-- Create database
CREATE DATABASE advi_db;

-- Create a user (optional, or use your existing PostgreSQL user)
CREATE USER advi_user WITH PASSWORD 'advi_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE advi_db TO advi_user;

-- Exit psql
\q
```

## Step 3: Update Environment Variables

Add this to your `.env` file in the `app/` directory:

```env
# PostgreSQL Connection String (single database for both student and faculty data)
DATABASE_URL=postgresql://advi_user:advi_password@localhost:5432/advi_db

# Or if using default postgres user:
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/advi_db
```

## Step 4: Install Python Dependencies

```bash
cd app
pip install -r requirements.txt
```

## Step 5: Initialize Database Tables

Run the migration script to create tables:

```bash
python -m app.db.migrate
```

Or if using the seed script (which will auto-create tables):

```bash
python -m app.db.seed
```

## Step 6: Verify Setup

Check that the database and tables exist:

```bash
psql -U advi_user -d advi_db -c "\dt"
```

You should see tables created:
- `students` (student records)
- `chat_messages` (student chat history)
- `preset_questions` (preset questions for lectures)
- `preset_responses` (student responses to preset questions)
- `lectures` (faculty lecture materials)

## Troubleshooting

### Connection refused
- Make sure PostgreSQL is running: `brew services list` (macOS) or `sudo systemctl status postgresql` (Linux)
- Check PostgreSQL is listening on port 5432: `lsof -i :5432`

### Authentication failed
- Verify username/password in `.env` matches what you created
- Try connecting manually: `psql -U advi_user -d advi_db`

### Database doesn't exist
- Make sure you ran the CREATE DATABASE commands in Step 2
- List databases: `psql -U postgres -c "\l"`
