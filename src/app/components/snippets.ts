export const recentDate = (createdAt: Date, updatedAt: Date): { date: Date, isUpdated: boolean } => {
  if (createdAt.getTime() >= updatedAt.getTime()) {
    return { date: createdAt, isUpdated: false };
  } else {
    return { date: updatedAt, isUpdated: true };
  }
}