using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangeLoggedAtColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LogedAt",
                schema: "fitapi",
                table: "foods",
                newName: "LoggedAt");

            migrationBuilder.CreateIndex(
                name: "IX_foods_LoggedAt",
                schema: "fitapi",
                table: "foods",
                column: "LoggedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_foods_LoggedAt",
                schema: "fitapi",
                table: "foods");

            migrationBuilder.RenameColumn(
                name: "LoggedAt",
                schema: "fitapi",
                table: "foods",
                newName: "LogedAt");
        }
    }
}
