import { Component, For, Show } from 'solid-js';
import { MenuItem } from '@interfaces';
import { NavLink, useNavigate } from '@solidjs/router';
import { Accordion, List, ListItem } from '@components';
import './index.css';

export interface TreeMenuProps {
  menu?: MenuItem[];
}

export const TreeMenu: Component<TreeMenuProps> = (props) => {
  const navigate = useNavigate();

  const onClick = (route: string) => {
    navigate(route);
  };

  return (
    <List classList={{ 'tree-menu': true }}>
      <For each={props.menu}>
        {(item) => (
          <ListItem>
            <Accordion
              text={
                <Show fallback={item.text} when={item.route}>
                  <NavLink
                    onClick={[onClick, item.route]}
                    href={item.route || ''}
                    target={item.external ? 'blank' : undefined}
                  >
                    {item.text}
                  </NavLink>
                </Show>
              }
              expandable={Boolean(item.children?.length)}
            >
              <TreeMenu menu={item.children} />
            </Accordion>
          </ListItem>
        )}
      </For>
    </List>
  );
};
