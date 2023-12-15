'use strict';

import { Op } from 'sequelize';
import { PhoneModel, SpecificPhoneModel } from '../models';
import { SpecificPhoneInDb } from '../types';

export const getBrandNew = async ({ count }: { count:number }) => await PhoneModel.findAndCountAll({
  order: [['fullPrice', 'DESC']],
  offset: 0,
  limit: count,
});

export const getHotPrices = async ({ count }: { count:number }) => await PhoneModel.findAndCountAll({
  order: [['price', 'DESC']],
  offset: 0,
  limit: count,
});

export const getSuggestedProductsIds = async (phoneId: string) => {
  const ids = await PhoneModel.findAll({
    attributes: ['phoneId'],
    where: {
      id: {
        [Op.notIn]: [phoneId],
      },
    },
  });

  return ids;
};

export const getSuggestedProducts = async (ids: string[]) => {
  const phones =await PhoneModel.findAll({
    where: {
      phoneId: {
        [Op.in]: ids,
      },
    },
  });

  return phones;
};

export const getById = async (id: string): Promise<SpecificPhoneInDb | null> =>
  SpecificPhoneModel.findByPk(id);

export const getCount = async () => {
  return PhoneModel.count();
};

// export const getSliderData = () => {
// 	// const data = fs.re
//   return PhoneModel.count();
// };

type PaginationParams = {
  sortBy: string;
  selectedPage: number;
  elementsOnPage: number;
};

export const findAllWithPagination = async ({
  sortBy,
  selectedPage,
  elementsOnPage,
}: PaginationParams) => {

  const offset = (selectedPage - 1) * elementsOnPage;

  const { count, rows } = await PhoneModel.findAndCountAll({
    order: [[`${(sortBy)}`, 'ASC']],
    offset,
    limit: Number(elementsOnPage),
  });

  return {
    count,
    rows,
  };
};
