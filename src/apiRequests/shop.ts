const shopApiRequests = {
  getListShops: ({
    page,
    limit,
    search,
    isActive,
    order,
  }: {
    page: number;
    limit: number;
    search: string;
    isActive?: string;
    order?: string;
  }) => {},
};

export default shopApiRequests;
