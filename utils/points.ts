export const pointsCalc = (distance: number): number => {
  const maxPoints = 1000;
  const km = 1000;
  let points = maxPoints;

  while (distance >= 0.4 * km) {
    points--;
    if (distance < 10 * km) {
      distance -= 400;
    }

    if (distance >= 10 * km && distance < 200 * km) {
      distance -= 1000;
      if (distance < 10 * km) {
        distance = 10 * km - 1;
      }
    }

    if (distance >= 200 * km && distance < 4000 * km) {
      distance -= 10000;
      if (distance < 200 * km) {
        distance = 200 * km - 1;
      }
    }

    if (distance >= 4000 * km) {
      distance -= 20000;
      if (distance < 4000 * km) {
        distance = 4000 * km - 1;
      }
    }

    if (points <= 0) {
      return points === 0 ? points : 0;
    }
  }
  return points;
};
