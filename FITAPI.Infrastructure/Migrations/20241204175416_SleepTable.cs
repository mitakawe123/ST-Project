using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace FITAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SleepTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "sleep",
                schema: "fitapi",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LoggedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Hours = table.Column<double>(type: "double precision", nullable: false),
                    SleepTypeId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sleep", x => x.Id);
                    table.ForeignKey(
                        name: "FK_sleep_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_sleep_LoggedAt",
                schema: "fitapi",
                table: "sleep",
                column: "LoggedAt");

            migrationBuilder.CreateIndex(
                name: "IX_sleep_UserId",
                schema: "fitapi",
                table: "sleep",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "sleep",
                schema: "fitapi");
        }
    }
}
