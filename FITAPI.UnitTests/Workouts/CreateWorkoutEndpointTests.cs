using FakeItEasy;
using FastEndpoints;
using FITAPI.Application.DTOs.Requests.Workouts;
using FITAPI.Application.Services.Workouts;
using FITAPI.Domain.DTOs;
using FITAPI.Endpoints.Workouts;

namespace FITAPI.UnitTests.Workouts;

public class CreateWorkoutEndpointTests
{
    [Fact]
    public async Task HandleAsync_ShouldCreateWorkoutSuccessfully()
    {
        var workoutService = A.Fake<IWorkoutService>();

        var createWorkoutRequest = new CreateWorkoutRequest(
            Email: "test@example.com",
            WorkoutName: "Morning Workout",
            Description: "Full body workout",
            Exercises: new List<WorkoutExercise>
            {
                new(Name: "Push-ups", Reps: 20, Sets: 3),
                new(Name: "Squats", Reps: 15, Sets: 3)
            }
        );

        A.CallTo(() => workoutService.CreateWorkoutAsync(createWorkoutRequest, A<CancellationToken>.Ignored))
            .DoesNothing();

        var endpoint = Factory.Create<CreateWorkoutEndpoint>(workoutService);

        await endpoint.HandleAsync(createWorkoutRequest, CancellationToken.None);

        Assert.Equal("Workout Created", endpoint.Response);
        Assert.False(endpoint.ValidationFailed); 
            
        A.CallTo(() => workoutService.CreateWorkoutAsync(
                A<CreateWorkoutRequest>.That.Matches(req =>
                    req.Email == createWorkoutRequest.Email &&
                    req.WorkoutName == createWorkoutRequest.WorkoutName &&
                    req.Description == createWorkoutRequest.Description &&
                    req.Exercises.Count == createWorkoutRequest.Exercises.Count
                ), A<CancellationToken>.Ignored))
            .MustHaveHappenedOnceExactly();
    }
}