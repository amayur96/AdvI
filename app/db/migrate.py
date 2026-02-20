"""
Database migration script - creates all tables in PostgreSQL databases.
Run this once after setting up PostgreSQL to initialize the schema.
"""

from app.db.models import create_tables

if __name__ == "__main__":
    create_tables()
