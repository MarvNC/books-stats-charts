import { Series } from "@/utils/bookwalker/series";

export async function compareSeries(
  series: Series | null,
  otherSeries: Series | null,
) {
  if (!series) throw new Error("Main series is null");
  if (!otherSeries) throw new Error("Other series is null");

  /** Whether the main series' line is on top */
  const mainSeriesOnTop = calcMainSeriesOnTop(series, otherSeries);

  // Check if lines will ever intersect
  if (
    (mainSeriesOnTop &&
      series.weightedAverageWait < otherSeries.weightedAverageWait) ||
    (!mainSeriesOnTop &&
      series.weightedAverageWait > otherSeries.weightedAverageWait)
  ) {
    // TODO: add feedback callback
    console.log("Lines will never intersect");
    return;
  }

  while (true) {
    // Check if latest volumes are the same
    if (series.latestVolume === otherSeries.latestVolume) {
      // TODO: feedback callback
      const latestDate =
        series.latestReleaseDate > otherSeries.latestReleaseDate
          ? series.latestReleaseDate
          : otherSeries.latestReleaseDate;
      const latestVolume = Math.max(
        series.latestVolume,
        otherSeries.latestVolume,
      );
      console.log(`Catch up at volume ${latestVolume} on ${latestDate}`);
      return;
    }

    // Predict volume on series with closest predicted date
    const mainPredictedDate = series.predictedNextVolumeDate;
    const otherPredictedDate = otherSeries.predictedNextVolumeDate;
    if (mainPredictedDate.valueOf() < otherPredictedDate.valueOf()) {
      series.predictVolume();
    } else {
      otherSeries.predictVolume();
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}
function calcMainSeriesOnTop(series: Series, otherSeries: Series) {
  return series.latestVolume === otherSeries.latestVolume
    ? series.latestReleaseDate?.valueOf() <
        otherSeries.latestReleaseDate?.valueOf()
    : series.latestVolume > otherSeries.latestVolume;
}
