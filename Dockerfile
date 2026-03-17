# Use an official PHP image with Apache
FROM php:8.2-apache

# Install PostgreSQL client and PDO drivers
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Copy project files to the Apache document root
COPY . /var/www/html/

# Enable Apache mod_rewrite (often needed for PHP apps)
RUN a2enmod rewrite

# Set the port to Render's default (10000)
ENV PORT=10000
RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Set working directory
WORKDIR /var/www/html/

# Expose the port
EXPOSE 10000
