import s from "./StatisticsTable.module.scss";

export const StatisticsTable = ({ category }) => {
  const color = [
    "#81e1ff",
    "#4a56e2",
    "#ffd8d0",
    "#fed057",
    "#fd9498",
    "#00ad84",
    "#6e78e8",
    "#c5baff",
    "#24cca7",
  ];

  return (
    <div className={s.wrapper}>
      <div className={s.box}>
        <p className={s.title}>Categories</p>
        <p className={s.title}>Sum</p>
      </div>
      {category?.categoriesSummary.length ? (
        <ul>
          {category?.categoriesSummary
            ?.filter((items) => {
              return items.type !== "INCOME";
            })
            .map((item, index) => {
              return (
                <li key={item.name} className={s.item}>
                  <div className={s.box_item}>
                    <div
                      className={s.box_category}
                      style={{ backgroundColor: color[index] }}
                    ></div>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.total}</p>
                </li>
              );
            })}
          <li className={s.total}>
            <p>Expenses:</p>
            <p className={s.expense}>{category?.expenseSummary}</p>
          </li>
          <li className={s.total}>
            <p>Income:</p>
            <p className={s.income}>{category?.incomeSummary}</p>
          </li>
        </ul>
      ) : (
        <p className={s.text}>No transactions found</p>
      )}
    </div>
  );
};
export default StatisticsTable;
