import { createOffer, getMongoUri, getErrorMessage } from '../../shared/helpers/index.js';
import { MongoDatabaseClient, DatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { ConsoleLogger, Logger } from '../../shared/libs/logger/index.js';
import { OfferModel, OfferService, DefaultOfferService } from '../../shared/modules/offer/index.js';
import { UserService, UserModel, DefaultUserService } from '../../shared/modules/user/index.js';
import { Offer } from '../../shared/types/index.js';
import { Command, DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from '../index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.userService = new  DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
    this.logger = new ConsoleLogger();
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer)
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async saveOffer(offer: Offer) {
    console.log(offer);
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      name: offer.name,
      description: offer.description,
      postDate: offer.postDate,
      town: offer.town,
      previewPath: offer.previewPath,
      photos: offer.photos,
      premium: offer.premium,
      favorite: offer.favorite,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      amenities: offer.amenities,
      author: user,
      commentCount: offer.commentCount,
      latitude: offer.latitude,
      longitude: offer.longitude,
    });
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoUri(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;
    await this.databaseClient.connect(uri);
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
