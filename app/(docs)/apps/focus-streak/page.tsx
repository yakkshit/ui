import StreakCheckerDemo from "./components/streak-checker/streak-checker";
import UserProfileAndTaskSuggestion from "./components/streak-checker/user-profile-and-task-suggestion";


export default function FocusStreak() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Streak Checker App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StreakCheckerDemo />
        <UserProfileAndTaskSuggestion />
      </div>
    </div>
  )
}