export async function startActivity() {
  const res = await fetch('/api/activities/start', {
    method: 'POST',
  });
  return res.json();
}

export async function endActivity(id: number, path: string, duration: number, distance: number) {
  const res = await fetch(`/api/activities/${id}/end`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ path, duration, distance }),
  });
  return res.json();
}

export async function getActivities() {
  const res = await fetch('/api/activities');
  return res.json();
}
