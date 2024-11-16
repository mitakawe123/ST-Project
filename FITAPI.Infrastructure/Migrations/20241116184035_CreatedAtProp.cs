using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreatedAtProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Likes",
                table: "comments");

            migrationBuilder.EnsureSchema(
                name: "fitapi");

            migrationBuilder.RenameTable(
                name: "workouts",
                newName: "workouts",
                newSchema: "fitapi");

            migrationBuilder.RenameTable(
                name: "posts",
                newName: "posts",
                newSchema: "fitapi");

            migrationBuilder.RenameTable(
                name: "comments",
                newName: "comments",
                newSchema: "fitapi");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "fitapi",
                table: "posts",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "fitapi",
                table: "comments",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "fitapi",
                table: "posts");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "fitapi",
                table: "comments");

            migrationBuilder.RenameTable(
                name: "workouts",
                schema: "fitapi",
                newName: "workouts");

            migrationBuilder.RenameTable(
                name: "posts",
                schema: "fitapi",
                newName: "posts");

            migrationBuilder.RenameTable(
                name: "comments",
                schema: "fitapi",
                newName: "comments");

            migrationBuilder.AddColumn<long>(
                name: "Likes",
                table: "comments",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
