import { useGetProfileQuery, useVerifyQuery } from "../api/apiSlice";

export const useAuth = () => {
  const { data: verifyData, isLoading: verifyLoading, error: verifyError } = useVerifyQuery(undefined, {
    staleTime: 600000, 
    refetchOnReconnect: true,
    refetchOnFocus: true
  });

  const isAuthenticated = !!verifyData?.success && !verifyError;

  const { data: profileData, isLoading: profileLoading, error: profileError } = useGetProfileQuery(undefined, { 
    skip: !isAuthenticated,
    staleTime: 600000,
    refetchOnReconnect: true,
    refetchOnFocus: true
  });

  return {
    user: profileData?.data || (isAuthenticated ? verifyData?.data?.user : null),
    isAuthenticated,
    isLoading: verifyLoading || (isAuthenticated && profileLoading),
    error: verifyError || (isAuthenticated ? profileError : null),
  };
};