import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PlaceholderIMG from "../../../assets/imgs/drexel-overview-2.jpg";
import { supabase } from "../../../supabaseClient";

const SummaryTourCard = ({ stop, tag, openCard }) => {
  const [cardData, setCardData] = useState(null);

  const tagId = tag;

  useEffect(() => {
    if (!tagId) return;

    const fetchCardData = async () => {
      const { data, error } = await supabase
        .from("cardContent")
        .select("*")
        .eq("tag", tagId)
        .single();

      if (error) {
        console.error("Error fetching card data:", error);
      } else {
        setCardData(data);
      }
    };

    fetchCardData();
  }, [tagId]);

  return (
    <div
      className={styles.summaryTourCard}
      role="button"
      onClick={() => openCard(tag)}
    >
      <div className={styles.summaryTourCardInfo}>
        <p>
          <b>{stop?.title}</b>
        </p>
        <p>{stop?.subtitle}</p>
        <div className={styles.CatWrapper}>
          {stop?.categories?.map((category, index) => {
            return <p key={index}>{category}</p>;
          })}
        </div>
      </div>
      <div
        className={styles.summaryTourCardIMG}
        style={{
          backgroundImage: `url(${
            cardData?.headerImages?.[0] || PlaceholderIMG
          })`,
        }}
      ></div>
    </div>
  );
};

export default SummaryTourCard;
