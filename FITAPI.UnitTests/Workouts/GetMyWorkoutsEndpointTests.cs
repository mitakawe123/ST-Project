using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.DTOs.Responses.Workouts;
using FITAPI.Application.Services.Workouts;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.Workouts;

namespace FITAPI.UnitTests.Workouts;

public class GetMyWorkoutsEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldReturnMyWorkoutsSuccessfully()
    {
        var workoutService = A.Fake<IWorkoutService>();

        var myWorkoutsRequest = new MyWorkoutsRequest(Email: "test@example.com");

        var mockWorkouts = new List<MyWorkoutsResponse>
        {
            new(
                Id: 1,
                WorkoutName: "Morning Workout",
                WorkoutDescription: "A great start to the day",
                Exercises: new List<WorkoutExercise>
                {
                    new(Name: "Push-Up", Reps: 15, Sets: 3),
                    new(Name: "Squats", Reps: 20, Sets: 3)
                }
            ),
            new(
                Id: 2,
                WorkoutName: "Evening Workout",
                WorkoutDescription: "A good workout before bed",
                Exercises: new List<WorkoutExercise>
                {
                    new(Name: "Plank", Reps: 30, Sets: 3),
                    new(Name: "Lunges", Reps: 15, Sets: 3)
                }
            )
        };

        A.CallTo(() => workoutService.GetMyWorkoutsAsync(myWorkoutsRequest, A<CancellationToken>.Ignored))
            .Returns(Task.FromResult((IReadOnlyCollection<MyWorkoutsResponse>)mockWorkouts));

        var endpoint = Factory.Create<GetMyWorkoutsEndpoint>(workoutService);

        await endpoint.HandleAsync(myWorkoutsRequest, CancellationToken.None);

        Assert.Equal(2, endpoint.Response.Count);
        Assert.Equal("Morning Workout", endpoint.Response.ElementAt(0).WorkoutName);
        Assert.Equal("Evening Workout", endpoint.Response.ElementAt(1).WorkoutName);

        A.CallTo(() => workoutService.GetMyWorkoutsAsync(
                A<MyWorkoutsRequest>.That.Matches(req => req.Email == myWorkoutsRequest.Email),
                A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();
    }
}