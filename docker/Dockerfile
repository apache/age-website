FROM python:3.11-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends git texlive-latex-base dvisvgm \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
VOLUME ["/app"]

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt
