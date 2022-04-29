import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

export const IngredientDetails = (props) => {
    return (
        <>
            <img className='pb-4' src={props.image_large} alt={props.name} />
            <p className='text text_type_main-medium pb-8'>{props.name}</p>
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
                        <td>{props.calories}</td>
                        <td>{props.proteins}</td>
                        <td>{props.fat}</td>
                        <td>{props.carbohydrates}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
}