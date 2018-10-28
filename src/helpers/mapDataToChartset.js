
export const mapGroupsToDatasets = state => {
  // reduce avoid multiple maps (3x VS 1x)
  const { data, labels, colors } = state.list.groupedByCategories.reduce((acc, item) => ({
    data: acc.data.concat(item.total.toFixed(2)),
    labels: acc.labels.concat(item.name),
    colors: acc.colors.concat(item.color)
  }), { data: [], labels: [], colors: [] });

  return {
    outboundByGroup: {
      datasets: [{ data, backgroundColor: colors }],
      labels
    }
  }
};