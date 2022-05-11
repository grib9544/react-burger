import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { createRef, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from '../../hooks/useDebounce';
import styles from './burger-ingredients.module.css';
import { IngredientCard } from './ingredient-card/ingredient-card';

const ingredientNameMap = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки'
};

export const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('bun');

  const ingredientsItems = useSelector((state) => state.burger.ingredients.items);

  const ingredientsMap = useMemo(() => {
    const ingredientTypes = [...new Set(ingredientsItems.map((ingredient) => ingredient.type))];

    return ingredientTypes.reduce((acc, type) => {
      acc[type] = ingredientsItems.filter((ingredient) => ingredient.type === type);
      return acc;
    }, {});
  }, [ingredientsItems]);

  const tabsRef = useRef(null);
  const elementsRef = useRef(
    Object.keys(ingredientsMap).reduce((acc, type) => {
      acc[type] = createRef();
      return acc;
    }, {}),
    [ingredientsMap]
  );

  const onClick = (value) => {
    elementsRef.current[value].current.scrollIntoView({
      behavior: 'smooth'
    });

    setCurrent(value);
  };

  const onScroll = useDebouncedCallback(() => {
    const nearestElement = {
      distance: null,
      tab: 'bun'
    };

    const tabElement = tabsRef.current;

    Object.keys(elementsRef.current).forEach((type) => {
      const element = elementsRef.current[type].current;

      if (element) {
        const distance = Math.abs(
          tabElement.getBoundingClientRect().top - element.getBoundingClientRect().top
        );

        if (!nearestElement.distance || distance < nearestElement.distance) {
          nearestElement.distance = distance;
          nearestElement.tab = type;
        }
      }
    });

    setCurrent(nearestElement.tab);
  }, 200);

  return (
    <section className={styles.ingredients}>
      <div className={styles.ingredients__tab} ref={tabsRef}>
        {Object.keys(ingredientsMap).map((type) => (
          <Tab key={type} value={type} active={current === type} onClick={onClick}>
            {ingredientNameMap[type]}
          </Tab>
        ))}
      </div>
      <div className={styles.scrollable_content} onScroll={onScroll}>
        {Object.entries(ingredientsMap).map(([type, ingredients]) => (
          <div key={type}>
            <h2
              id={type}
              data-testid={type}
              ref={elementsRef.current[type]}
              className="text text_type_main-medium">
              {ingredientNameMap[type]}
            </h2>
            <ul className={styles.ingredients__list}>
              {ingredients.map((ing) => (
                <li key={ing._id}>
                  <IngredientCard {...ing} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
