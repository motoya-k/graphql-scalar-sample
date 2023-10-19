import TenantEntity, { TenantInput, TenantUpdateInput } from "../entities/tenant.ts";
import UserEntity from "../entities/user.ts";

export class TenantQueryService {
    async getTenantById(id: string) {
        return await TenantEntity.manager.getById(id);
    }

    async getAllTenants() {
        return await TenantEntity.manager.getAll();
    }

    async getUsersByTenantId(tenantId: string) {
        return await UserEntity.manager.getAllByTenantId(tenantId);
    }
}

export class TenantMutationService {
    async createTenant(input: TenantInput) {
        return await TenantEntity.manager.create(input);
    }

    async updateTenant(id: string, input: TenantUpdateInput) {
        return await TenantEntity.manager.update(id, input);
    }

    async deleteTenant(id: string) {
        return await TenantEntity.manager.delete(id);
    }
}
