import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function MobileNavbar() {
  return (
	<UncontrolledDropdown nav inNavbar>
		<DropdownToggle nav caret>
			Options
		</DropdownToggle>
		<DropdownMenu right>
			<DropdownItem>Option 1</DropdownItem>
			<DropdownItem>Option 2</DropdownItem>
			<DropdownItem divider />
			<DropdownItem>Reset</DropdownItem>
		</DropdownMenu>
	</UncontrolledDropdown>
  )
}
