# Laptop Theft Monitoring System

This system allows users to register laptops and report theft cases. Admins can track, resolve, and delete theft reports.

## API Endpoints

| Action               | Route                    | Method |
| -------------------- | ------------------------ | ------ |
| Register User        | `/users/register`        | POST   |
| Register Laptop      | `/laptops/register`      | POST   |
| Report Theft         | `/theft/report`          | POST   |
| Resolve Theft Report | `/theft/:id/resolve`     | PUT    |
| Delete Report        | `/theft/:id`             | DELETE |
| Get All Laptops      | `/laptops`               | GET    |
| Track Laptop         | `/laptops/track/:serial` | GET    |
