/* eslint-disable consistent-return */
import { m } from 'framer-motion';
// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// assets
import { ForbiddenIllustration } from 'src/assets/illustrations';
// components
import { useEffect, useState } from 'react';
import { MotionContainer, varBounce } from 'src/components/animate';
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  permission?: string;
  returnBoolean?: boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const RoleBasedGuard = ({
  hasContent,
  roles,
  permission,
  children,
  sx,
  returnBoolean,
}: RoleBasedGuardProp) => {

  const [hasCommonRole, setHasCommonRole] = useState<any>(null);
  const [hasCommonPermission, setHasCommonPermission] = useState<any>(null);

  const { user } = useAuthContext();


  useEffect(() => {

    if (user) {

      const userRoles = user?.roles || [];
      const userPermissions = user?.permissions || [];

      const hasCommonRoleV = userRoles.some((role: string) => roles && roles.includes(role));
      const hasCommonPermissionV = permission && userPermissions.includes(permission);

      setHasCommonRole(hasCommonRoleV);
      setHasCommonPermission(hasCommonPermissionV);
    }


  }, [permission, roles, user])





  if (returnBoolean && !hasContent) {
    return null;
  }
  if ((roles && hasCommonRole === false) || (permission && hasCommonPermission === false)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
      </Container>
    ) : null;
  }
  if (children) {
    return <> {children} </>;
  }

}
export default RoleBasedGuard;


