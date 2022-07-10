import { Action, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { TAppDispatch, TRootState } from '../../types';
import { session } from '../session';
import * as orders from '../slices/orders';
import * as porders from '../slices/profile-orders';

export const orderActions = {
  onOpen: orders.connectStart,
  onClose: orders.connectStop,
  onMessage: orders.updateOrders
};

export const profileOrderActions = {
  onOpen: porders.connectStart,
  onClose: porders.connectStop,
  onMessage: porders.updateOrders
};

export const orderMiddleware = (
  wsURL: string,
  wsActions: typeof orderActions | typeof profileOrderActions,
  withToken: boolean
): Middleware => {
  return (store: MiddlewareAPI<TAppDispatch, TRootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: Action) => {
      const { dispatch } = store;
      const { type } = action;
      const { onMessage, onOpen, onClose } = wsActions;

      if (!socket) {
        if (withToken) {
          const { token } = session;
          socket = new WebSocket(`${wsURL}?token=${token}`);
        } else {
          socket = new WebSocket(`${wsURL}`);
        }
      }

      if (type === onClose.type) {
        socket && socket.close(1000, 'CLOSE_NORMAL');
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          dispatch(
            onMessage({ orders: data.orders, total: data.total, totalToday: data.totalToday })
          );
        };

        socket.onclose = () => {
          dispatch(onClose());
        };
      }

      next(action);
    };
  };
};
