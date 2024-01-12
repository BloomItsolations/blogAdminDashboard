import { Helmet } from 'react-helmet-async';

import { users } from 'src/_mock/user';

import TableView from 'src/components/TableView';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <TableView
        title="Customer"
        tablebody={users}
        tableheader={[
          { id: 'name', label: 'Name' },
          { id: 'company', label: 'Company' },
          { id: 'role', label: 'Role' },
          { id: 'isVerified', label: 'Verified', align: 'center' },
          { id: 'status', label: 'Status' },
          { id: '' },
        ]}
      />
    </>
  );
}
