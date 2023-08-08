import { useScreenWidth } from "../hooks/useScreenWidth";
import { Filter } from "../components/Filter";
import { CardsList } from "../components/CardsList";
import { Pagination } from "../components/Pagination";
import { SCREEN_WIDTHS } from "../consts";

export const HomePage = () => {
  const screenWidth = useScreenWidth();
  return (
    <section className="main-section">
      <div className="container flex flex-col gap-10 items-center">
        <Filter screenWidth={screenWidth} />
        {screenWidth >= SCREEN_WIDTHS.tablet && (
          <h1 className="title">My events</h1>
        )}
        <CardsList />
        <Pagination screenWidth={screenWidth} />
      </div>
    </section>
  );
};
