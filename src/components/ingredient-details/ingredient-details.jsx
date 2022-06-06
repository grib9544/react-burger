import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const { id } = useParams();

  const ingredient = useSelector((state) =>
    state.burger.ingredients.items.find((ing) => ing._id === id)
  );

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.details_container}>
        <img className="pb-4" src={ingredient.image_large} alt={ingredient.name} />
        <p className="text text_type_main-medium pb-8">{ingredient.name}</p>
        <table className={`${styles.details_table} pb-15 text_color_inactive`}>
          <thead>
            <tr>
              <td>Калории, ккал</td>
              <td>Белки, г</td>
              <td>Жиры, г</td>
              <td>Углеводы, г</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text text_type_digits-default">
              <td>{ingredient.calories}</td>
              <td>{ingredient.proteins}</td>
              <td>{ingredient.fat}</td>
              <td>{ingredient.carbohydrates}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
