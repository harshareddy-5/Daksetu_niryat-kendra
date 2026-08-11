FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy and install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY . .

# Set default port
ENV PORT=8000

# Expose port
EXPOSE 8000

# Run uvicorn on $PORT
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
