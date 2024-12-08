using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Application.Services.Workouts;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.Workouts;

namespace FITAPI.UnitTests.Workouts;

public class TopWorkoutsEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnTopWorkoutsSuccessfully()
    {
        var workoutService = A.Fake<IWorkoutService>();

        var topWorkoutsRequest = new TopWorkoutsRequest(Email: "test@example.com");

        var mockTopWorkouts = new List<TopWorkoutsResponse>
        {
            new(
                Id: 1,
                WorkoutOwnerName: "John Doe",
                WorkoutName: "Morning Workout",
                WorkoutDescription: "Start your day strong",
                Exercises: new List<WorkoutExercise>
                {
                    new(Name: "Push-Up", Reps: 20, Sets: 3),
                    new(Name: "Squats", Reps: 25, Sets: 3)
                }
            ),
            new(
                Id: 2,
                WorkoutOwnerName: "Jane Smith",
                WorkoutName: "Evening Workout",
                WorkoutDescription: "Wind down with this workout",
                Exercises: new List<WorkoutExercise>
                {
                    new(Name: "Plank", Reps: 30, Sets: 3),
                    new(Name: "Lunges", Reps: 20, Sets: 3)
                }
            )
        };

        A.CallTo(() => workoutService.GetTopWorkoutsAsync(topWorkoutsRequest, A<CancellationToken>.Ignored))
            .Returns(Task.FromResult<IReadOnlyCollection<TopWorkoutsResponse>>(mockTopWorkouts));

        var endpoint = Factory.Create<TopWorkoutsEndpoint>(workoutService);

        await endpoint.HandleAsync(topWorkoutsRequest, CancellationToken.None);

        Assert.Equal(2, endpoint.Response.Count); 
        Assert.Equal("Morning Workout", endpoint.Response.ElementAt(0).WorkoutName);
        Assert.Equal("Evening Workout", endpoint.Response.ElementAt(1).WorkoutName);

        A.CallTo(() => workoutService.GetTopWorkoutsAsync(
                A<TopWorkoutsRequest>.That.Matches(req => req.Email == topWorkoutsRequest.Email),
                A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();
    }
}