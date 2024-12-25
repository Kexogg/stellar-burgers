import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addItem } from '../../services/slices/constructorSlice';
import { useLocation } from 'react-router-dom';
import { FC, memo, useState } from 'react';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addItem({ ...ingredient, id: ingredient._id }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
