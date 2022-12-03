import { Component, For, Match, Show, Switch } from 'solid-js';
import { MenuItem } from '@interfaces';
import { NavLink } from '@solidjs/router';
import { Accordion, List, ListItem } from '@components';
import './index.css';

export interface TreeMenuProps {
  menu?: MenuItem[];
}

export const TreeMenu: Component<TreeMenuProps> = (props) => {
  return (
    <List classList={{ 'tree-menu': true }}>
      <For each={props.menu}>
        {(item) => (
          <ListItem>
            <Accordion
              text={
                <Show fallback={item.text} when={item.route}>
                  <NavLink
                    href={item.route || ''}
                    target={item.external ? 'blank' : undefined}
                  >
                    {item.text}
                  </NavLink>
                </Show>
              }
            >
              <TreeMenu menu={item.children} />
            </Accordion>
          </ListItem>
        )}
      </For>
    </List>
  );
};
