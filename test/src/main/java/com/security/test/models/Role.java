package com.security.test.models;

import static com.security.test.models.Permission.ADMIN_CREATE;
import static com.security.test.models.Permission.ADMIN_DELETE;
import static com.security.test.models.Permission.ADMIN_READ;
import static com.security.test.models.Permission.ADMIN_UPDATE;
import static com.security.test.models.Permission.CLIENT_CREATE;
import static com.security.test.models.Permission.CLIENT_DELETE;
import static com.security.test.models.Permission.CLIENT_READ;
import static com.security.test.models.Permission.CLIENT_UPDATE;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Role {
        USER(Collections.emptySet()),
        ADMIN(
                        Set.of(
                                        ADMIN_CREATE,
                                        ADMIN_UPDATE,
                                        ADMIN_READ,
                                        ADMIN_DELETE,
                                        CLIENT_CREATE,
                                        CLIENT_UPDATE,
                                        CLIENT_READ,
                                        CLIENT_DELETE)),
        CLIENT(
                        Set.of(
                                        CLIENT_CREATE,
                                        CLIENT_READ,
                                        CLIENT_UPDATE,
                                        CLIENT_DELETE));

        @Getter
        private final Set<Permission> permissions;

        public List<SimpleGrantedAuthority> getAuthorities() {
                var authorities = getPermissions()
                                .stream()
                                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                                .collect(Collectors.toList());
                authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
                return authorities;
        }
}