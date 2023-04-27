import { Inject, Injectable } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepositorie: Repository<CityEntity>,
        private readonly cacheService: CacheService,
    ) {}

    async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
        return this.cacheService.getCache<CityEntity[]>(
            `state_${stateId}`,
            () =>
                this.cityRepositorie.find({
                    where: {
                        stateId,
                    },
                }),
        );
    }
}
