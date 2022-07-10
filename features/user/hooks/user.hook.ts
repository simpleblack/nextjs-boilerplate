import { useLazyQuery } from "@apollo/client";
import { FetchUsersDocument } from "generated/graphql";
import { useEffect } from "react";
import { User, Users } from "../types/user";

type Params = {
  limit: number;
  offset: number;
  category: string;
  keyword: string;
  mode: string;
  role: string;
}

export const useGetUsersLazy = (initParams: Params): {
  loading: boolean,
  items: User[],
  refrash: Function,
} => {
  const [queryHandler, { loading, data }] = useLazyQuery<Users>(
    FetchUsersDocument, {
    onError: err => {
      alert(err.message);
    }
  });

  async function call(params: Params) {
    let limit = params.limit || 100;
    let offset = params.offset || 0;
    let where: any = {
      "role": {
        "_eq": params.role,
      },
    };

    if (params.category != 'all') {
      if (params.keyword) {
        if (params.category == 'name') {
          where = {
            ...where, ...{
              "nickname": {
                "_ilike": `%${params?.keyword}%`,
              },
            }
          };
        } else if (params.category == 'email') {
          where = {
            ...where, ...{
              "email": {
                "_eq": params?.keyword,
              },
            }
          };
        }
      }
    }

    if (params.mode != 'all') {
      where = {
        ...where, ...{
          "mode": {
            "_eq": params?.mode,
          },
        }
      };
    }

    try {
      queryHandler({
        variables: {
          "limit": limit,
          "offset": offset,
          "where": where,
        },
        context: {
          headers: {
          },
        },
      });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  useEffect(() => {
    call(initParams)
  }, []);

  console.log(data);

  return { loading, items: data?.items || [], refrash: call };
}
