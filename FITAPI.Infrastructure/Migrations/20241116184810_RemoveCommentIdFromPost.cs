using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FITAPI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCommentIdFromPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentId",
                schema: "fitapi",
                table: "posts");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CommentId",
                schema: "fitapi",
                table: "posts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
